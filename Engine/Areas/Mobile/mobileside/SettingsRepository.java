package service;

import android.net.wifi.ScanResult;
import android.widget.ImageView;

import com.google.gson.Gson;

import java.util.List;

import service.models.OfficeLocationViewModel;
import service.models.VoidResultViewModel;

public class SettingsRepository extends BaseRepository {

    private String savePersonImageUrl = "savePersonImageUrl";
    private String saveSelectedWifiUrl = "saveSelectedWifiUrl";
    private String saveIsOneDeviceEnabledUrl = "saveIsOneDeviceEnabledUrl";
    private String saveFaceRecognationUrl = "saveFaceRecognationUrl";
    private String saveNotificationsEnabledUrl = "saveNotificationsEnabledUrl";


    public void savePersonImage(ImageView imageView) throws Exception {
        callurl(this.baseurl + "/" + savePersonImageUrl);
    }

    public void saveSelectedWifi(ScanResult scanResults) throws Exception {
        callurl(this.baseurl + "/" + saveSelectedWifiUrl);
    }

    public void saveIsOneDeviceEnabled(boolean isChecked) throws Exception {
        callurl(this.baseurl + "/" + saveIsOneDeviceEnabledUrl);
    }

    public void saveFaceRecognation(boolean isChecked) throws Exception {
        callurl(this.baseurl + "/" + saveFaceRecognationUrl);

    }

    public void saveNotificationsEnabled(boolean isChecked) throws Exception {
        callurl(this.baseurl + "/" + saveNotificationsEnabledUrl);
    }
}
