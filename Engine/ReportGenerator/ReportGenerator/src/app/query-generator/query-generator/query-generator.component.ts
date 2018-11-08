import {Component, OnInit} from '@angular/core';
import {SqlQueryGeneratorComponent} from "./sql-query-generator/sql-query-generator.component";
import {DataComponent} from "../data/data.component";

@Component({
  selector: 'app-query-generator',
  templateUrl: './query-generator.component.html',
  styleUrls: ['./query-generator.component.css'],
  providers: [SqlQueryGeneratorComponent]
})
export class QueryGeneratorComponent implements OnInit {


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
    });
  }

  ngOnInit() {


  }

}
