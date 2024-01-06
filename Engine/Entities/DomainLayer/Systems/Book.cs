using Engine.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Engine.Entities.Models.ICore;

namespace Entities
{
    public class Book : BaseEntity
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string ApplicationUserId { get; set; }
        public string Author { get; set; }
        [DropDown(Service = "", MethodName = "GetDropDownList",Ajax= "GetDropDownList",Controller="Rent")]
        public ICollection<Rent> Rents { get; set; }

    }
    

    public class Rent : BaseEntity
    {
        public Rent()
        {
            Date=DateTime.Now;
        }
        
        [DateTime]
        public DateTime Date { get; set; }
        public long BookId { get; set; }

        [DropDown]
        public Book Book { get; set; }

        [DataTable()]
        public Student Student { get; set; }
        public long StudentId { get; set; }
        public override string Name { get; set; }
    }

    public class Student : BaseEntity
    {
        public string LName { get; set; }
        [DataTable]
        public ICollection<Rent> Rents { get; set; }

        public override string Name { get; set; }
    }
}
