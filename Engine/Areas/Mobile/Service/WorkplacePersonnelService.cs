using System;
using System.Data.Entity;
using System.Linq;
using Engine.Areas.Mobile.Models;
using ServiceLayer.Absence;
using ServiceLayer.Systems;
using WebAppIDEEngine.Models;

namespace Engine.Areas.Mobile.Service
{
    public class WorkplacePersonnelService : CommonService<WorkplacePersonnel>
    {
        public override void Save(WorkplacePersonnel p)
        {
            using (var db = new EngineContext())
            {
                if (p.WorkplaceId == 0)
                    throw new JServiceException("محل کار مشخص نشده است");


                if (p.PersonnelId.HasValue)
                {
                    var personnel = db.Personnels.Find(p.PersonnelId);
                    if (personnel == null)
                    {
                        throw new JServiceException("پرسنل یافت نشد");
                    }


                  

                    if (string.IsNullOrEmpty(p.Username))
                    {
                        if (string.IsNullOrEmpty(personnel.Code))
                            throw new JServiceException(
                                "کد ملی برای این پرسنل یافت نشد لطفا نام کاربری را دستی وارد نمایید");
                        p.Username = personnel.Code;
                    }

                    if (string.IsNullOrEmpty(p.Password))
                    {
                        if (string.IsNullOrEmpty(personnel.Code))
                            throw new JServiceException(
                                "کد ملی برای این پرسنل یافت نشد لطفا رمز عبور را دستی وارد نمایید");
                        p.Password = personnel.Code;
                    }


               
                }

              

                if (p.Id == 0)
                {
                    var any = db.WorkplacePersonnels.Any(wp =>
                    wp.Username == p.Username);

                    if (any)
                        throw new JServiceException("این نام کاربری قبلا موجود است لطفا یک نام دیگر وارد نمایید");

                     any = db.WorkplacePersonnels.Any(wp =>
                      wp.PersonnelId == p.PersonnelId);

                    if (any)
                        throw new JServiceException("برای این کاربر قبلا نام کاربری و رمز عبور تعریف شده است");


                    p.Password = SecurityUtility.EncryptAndEncode(p.Password);
                    db.WorkplacePersonnels.Add(p);
                }
                else
                {
                    var wp = db.WorkplacePersonnels.Find(p.Id);
                    if (wp == null)
                        throw new JServiceException("رکورد برای ذخیره و اپدیت شدن یافت نشد");


                    // نام کاربری را تغییر داده باشد ، نباید تکراری باشد
                    if (wp.Username != p.Username)
                    {
                        var any = db.WorkplacePersonnels.Any(wp2 =>
                  wp2.Username == p.Username && wp2.Id!=p.Id);

                        if (any)
                            throw new JServiceException("این نام کاربری قبلا موجود است لطفا یک نام دیگر وارد نمایید");

                    }




                    try
                    {
                        // اگر قبلا شده باشد ، خطا نمی دهد
                         SecurityUtility.DecodeAndDecrypt(p.Password);

                    }
                    catch (Exception)
                    {
                    p.Password = SecurityUtility.EncryptAndEncode(p.Password);
                        // اگر خطا داد یعنی انکریپت نشده است
                    }


                    db.Entry(wp).CurrentValues.SetValues(p);

                    db.Entry(wp).State = EntityState.Modified;
                }

                db.SaveChanges();
            }
        }
    }
}