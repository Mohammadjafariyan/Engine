package service;

import java.io.IOException;

import clock.aut.SingleTon;
import service.models.ClockInViewModel;
import service.models.ClockInViewModelResult;

public class ClockRepository extends BaseRepository {
    private String clockInUrl = "clockIn/1";
    private String clockOutUrl = "clockOut/1";

    public ClockInViewModelResult ClockIn() throws IOException {

        String res = post(this.baseurl + "/" + clockOutUrl,null);

        ClockInViewModelResult model = new ClockInViewModelResult(res);

        return model;

    }

    public ClockInViewModelResult ClockOut() throws IOException {

        ClockInViewModel vm=new ClockInViewModel();

        vm.setScanResults(SingleTon.getInstance().getScanResults());
        vm.setLocation(SingleTon.getInstance().getLocation());
        vm.setqRCodeContent(SingleTon.getInstance().getqRCodeContent());
        vm.setImageView(SingleTon.getInstance().getImageView());


        String res = post(this.baseurl + "/" + clockOutUrl,null);

        ClockInViewModelResult model = new ClockInViewModelResult(res);

        return model;

    }
}
