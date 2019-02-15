package service;

import android.util.Log;

import com.google.gson.Gson;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.IOException;

import clock.aut.SingleTon;
import mock.MockServer;
import service.base.MyGlobal;
import service.models.VoidResultViewModel;

public abstract class BaseRepository {
    protected String baseurl = MyGlobal.serverBaseUrl;

    public static final boolean isMockServerEnabled = true;
    private MockServer mockServer = new MockServer();


    public void callurl(String url) throws Exception {
        String res = post(url, null);

        Gson gson = new Gson();
        VoidResultViewModel vm = gson.fromJson(res, VoidResultViewModel.class);

        if (!vm.isSuccess()) {
            throw new Exception(vm.getMessage());
        }
    }

    protected String post(String url, Object o) throws IOException {

        if (isMockServerEnabled) {

            return mockServer.dispach(url, o);
        }

        HttpClient httpclient = new DefaultHttpClient();
        HttpPost httppost = new HttpPost(url);
        Log.d("http client post set", url);


        HttpResponse response = httpclient.execute(httppost);
        Log.d("YourAsync", "Executed");


        Header[] headers = response.getHeaders("token");
        if (headers.length > 1) {
            findAndSetTokenInHeaders(headers);
        }

        return response.getEntity().getContent().toString();
    }

    private void findAndSetTokenInHeaders(Header[] headers) {

        Header tokenHeader = null;
        for (Header h : headers) {
            if (h.getName().equals("token"))
                tokenHeader = h;
        }

        if (tokenHeader != null) {
            SingleTon.getInstance().setToken(tokenHeader.getValue());
        }

    }
}
