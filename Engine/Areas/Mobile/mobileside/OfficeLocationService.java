package service;

import java.io.IOException;
import java.util.List;

import service.models.OfficeLocationViewModel;

public class OfficeLocationService extends BaseRepository {
    private String officeLocationsUrl = "offices";

    public List<OfficeLocationViewModel> getAll() throws IOException {
        String res = post(this.baseurl + "/" + officeLocationsUrl, null);

        OfficeLocationViewModel model = new OfficeLocationViewModel();

        List<OfficeLocationViewModel> modelList = model.parseJson(res);


        return modelList;
    }
}
