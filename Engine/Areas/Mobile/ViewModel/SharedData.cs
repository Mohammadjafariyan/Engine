package service.models;

import android.location.Location;
import android.net.wifi.ScanResult;
import android.widget.ImageView;

import java.util.List;

public class SharedData {

    private String token;
    private Location location;
    private ImageView imageView;

    private String qRCodeContent;

    private List<ScanResult> scanResults;
    private boolean clockedIn;
    private List<UserClockTypeViewModel> userClockTypes;
    private boolean admin;
    private ScanResult selectedScanedResult;
    private boolean oneDeviceEnabled;
    private boolean faceRecognation;
    private boolean notificationsEnabled;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public ImageView getImageView() {
        return imageView;
    }

    public void setImageView(ImageView imageView) {
        this.imageView = imageView;
    }

    public List<ScanResult> getScanResults() {
        return scanResults;
    }

    public void setScanResults(List<ScanResult> scanResults) {
        this.scanResults = scanResults;
    }


    public String getqRCodeContent() {
        return qRCodeContent;
    }

    public void setqRCodeContent(String qRCodeContent) {
        this.qRCodeContent = qRCodeContent;
    }

    public boolean isOk() {

        if (oneDeviceEnabled) {
            if (qRCodeContent == null)
                return false;
            return true;
        }


        for (int i = 0; i < userClockTypes.size(); i++) {

            switch (userClockTypes.get(i).getType()) {
                case GPS:
                    if (location == null)
                        return false;
                case Wifi:
                    if (scanResults == null)
                        return false;
                case QRCode:
                    if (qRCodeContent == null)
                        return false;
                case CameraSelfie:
                    if (imageView == null)
                        return false;
            }

        }
        return true;
    }

    public boolean isClockedIn() {
        return clockedIn;
    }

    public void setClockedIn(boolean clockedIn) {
        this.clockedIn = clockedIn;
    }

    public void setUserClockTypes(List<UserClockTypeViewModel> userClockTypes) {
        this.userClockTypes = userClockTypes;
    }

    public List<UserClockTypeViewModel> getUserClockTypes() {
        return userClockTypes;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public void setSelectedScanedResult(ScanResult selectedScanedResult) {
        this.selectedScanedResult = selectedScanedResult;
    }

    public ScanResult getSelectedScanedResult() {
        return selectedScanedResult;
    }


    public void setOneDeviceEnabled(boolean oneDeviceEnabled) {
        this.oneDeviceEnabled = oneDeviceEnabled;
    }

    public boolean getOneDeviceEnabled() {
        return oneDeviceEnabled;
    }

    public void setFaceRecognation(boolean faceRecognation) {
        this.faceRecognation = faceRecognation;
    }

    public boolean getFaceRecognation() {
        return faceRecognation;
    }

    public void setNotificationsEnabled(boolean notificationsEnabled) {
        this.notificationsEnabled = notificationsEnabled;
    }

    public boolean getNotificationsEnabled() {
        return notificationsEnabled;
    }
}
