import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SqlQueryGeneratorComponent} from "./sql-query-generator/sql-query-generator.component";
import {DataComponent} from "../data/data.component";

declare var hljs:any;
declare var $:any;
@Component({
  selector: 'app-query-generator',
  templateUrl: './query-generator.component.html',
  styleUrls: ['./query-generator.component.css'],
  providers: [SqlQueryGeneratorComponent]
})
export class QueryGeneratorComponent implements OnInit , AfterViewInit {


  constructor(public sqlQueryGeneratorComponent: SqlQueryGeneratorComponent,
              public dataComponent: DataComponent) {
  }

  generate() {
    this.sqlQueryGeneratorComponent.Generate(
      this.dataComponent.getPropertiesOnly(),
      null, this.dataComponent.joinTables,
      this.dataComponent.mainTable
    ).toPromise().then(r => {

      this.dataComponent.SQL = r;

      /*$('code').each(function(i, block) {
        hljs.highlightBlock(block);
      });*/

    });
  }

  ngOnInit() {



  }

  ngAfterViewInit(): void {


  }



}
