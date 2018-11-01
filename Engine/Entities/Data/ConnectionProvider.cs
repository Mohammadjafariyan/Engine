using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Data
{
    public class SQLServerDefaultConnectionProvider : IConnectionProvider
    {
        
        public string GetConnectionString()
        {
            //Build an Entity Framework connection string

            SqlConnectionStringBuilder sqlString = new SqlConnectionStringBuilder()
            {

                DataSource = "sobhansystems.ir", // Server name

                InitialCatalog = "buludco1_demiral",  //Database

                   UserID = "buludco1_d2",         //Username

                     Password = "Mktz8^64",  //Password
            };
            
            EntityConnectionStringBuilder entityString = new EntityConnectionStringBuilder()
            {

                

                //Metadata = @"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-Engine-20180928024320.mdf;Initial Catalog=aspnet-Engine-20180928024320;Integrated Security=True",
                Metadata = "res://*",

                ProviderConnectionString = sqlString.ToString()

            };

            return
                sqlString
                    .ToString(); //@"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-Engine-20180928024320.mdf;Initial Catalog=aspnet-Engine-20180928024320;Integrated Security=True";
        }
    }

    public class ConnectionProviderFactory
    {
        private IConnectionProvider _current;

        public IConnectionProvider Current
        {
            get
            {
                if(_current==null)
                    _current=new SQLServerDefaultConnectionProvider();
                return _current;
            }
            set { _current = value; }
        }
    }

}
