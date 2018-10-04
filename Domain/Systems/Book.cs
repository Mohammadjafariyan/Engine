using Engine.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppIDEEngine.Models.ICore;

namespace Entities
{
    public class Book:IModel
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        [DataTable]
        public ICollection<Rent> Rents { get; set; }
    }

    public class Rent
    {
        [Key]
        public long Id { get; set; }

        [DateTime]
        public DateTime Date { get; set; }
        public long BookId { get; set; }

        [DropDown]
        public Book Book { get; set; }

        [DataTable()]
        public Student Student { get; set; }
        public long StudentId { get; set; }
    }

    public class Student
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string LName { get; set; }
        [DataTable]
        public ICollection<Rent> Rents { get; set; }
    }
}
