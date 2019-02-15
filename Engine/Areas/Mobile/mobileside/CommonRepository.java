package service;

import java.util.List;

import service.models.UserClockTypeViewModel;

public class CommonRepository extends BaseRepository {


    private static final String ClockTypeListUrl = "ClockTypeList";

    public List<UserClockTypeViewModel> getUserClockTypeList() throws Exception {

        String res = post(this.baseurl + "/" + ClockTypeListUrl, null);

        UserClockTypeViewModel model = new UserClockTypeViewModel();
        List<UserClockTypeViewModel> models = model.parseJson(res);

        if (models == null)
            throw new Exception("تعداد روش های تنظیم شده برای ثبت ساعت کاربر صفر است ");

        return models;
    }
}



