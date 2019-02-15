package service;

import com.google.gson.Gson;

import service.models.LoginViewModel;
import service.models.LoginViewModelResult;

public class LoginRepository extends BaseRepository {


    private String loginUrl = "login";

    public LoginRepository(String url) {
        this.baseurl = url;
    }


    private EncriptorService encriptorService = new EncriptorService();


    public LoginViewModelResult Login(String userName, String password) throws Exception {

        if (userName == null || userName == ""
                || password == null || password == "")
            throw new Exception("مقادیر ورودی اشتباه است ");

        String res = post(this.baseurl + "/" + loginUrl, new LoginViewModel(userName, password));


        try {
            Gson gson = new Gson();
            LoginViewModelResult model = gson.fromJson(res, LoginViewModelResult.class);
            return model;
        } catch (Exception e) {
            throw new Exception("اطلاعات بازگشتی از سرور اشتباه است و در تبدیل دیتا خطا بوجود آمد");
        }


    }


}
