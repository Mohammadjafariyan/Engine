package service.models;

import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.List;

import service.base.ClockType;

public class UserClockTypeViewModel  extends  BaseViewModel{
    private ClockType type;
    private int order;

    public UserClockTypeViewModel(String res) {

    }

    public UserClockTypeViewModel() {

    }

    public List<UserClockTypeViewModel> parseJson(String res)  {
        Gson g = new Gson();
        UserClockTypeViewModel[] arr= g.fromJson(res,UserClockTypeViewModel[].class);

        return Arrays.asList(arr);
    }

    public void setType(ClockType type) {
        this.type = type;
    }

    public ClockType getType() {
        return type;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
