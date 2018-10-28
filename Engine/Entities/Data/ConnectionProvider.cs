using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Data
{
    public class ConnectionProvider
    {
        public static string GetSqlConnectionString()
        {
            SqlConnectionStringBuilder sqlString = new SqlConnectionStringBuilder()

            {

                DataSource = "SOURAV-PC", // Server name

                InitialCatalog = "efDB",  //Database

             //   UserID = "sourav",         //Username

           //     Password = "mypassword",  //Password

            };
            return sqlString.ConnectionString;
        }
        public static  string GetEntityConnectionString()
        {
            //Build an Entity Framework connection string

            EntityConnectionStringBuilder entityString = new EntityConnectionStringBuilder()

            {

                Provider = "System.Data.SqlClient",

                Metadata = @"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-Engine-20180928024320.mdf;Initial Catalog=aspnet-Engine-20180928024320;Integrated Security=True",

               // ProviderConnectionString = sqlString.ToString()

            };

            return @"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-Engine-20180928024320.mdf;Initial Catalog=aspnet-Engine-20180928024320;Integrated Security=True";
        }
    }
}
