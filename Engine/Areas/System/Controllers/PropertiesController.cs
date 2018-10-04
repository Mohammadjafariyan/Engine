using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebAppIDEEngine.Models;
using WebAppIDEEngine.Models.Core;

namespace WebAppIDEEngine.Areas.System.Controllers
{
    [Area("System")]
    public class PropertiesController : Controller
    {
        private readonly EngineContext _context;

        public PropertiesController(EngineContext context)
        {
            _context = context;
        }

        // GET: System/Properties
        public async Task<IActionResult> Index(string searchTerm)
        {
            ViewData["searchTerm"] = searchTerm;

            var dt = _context.Properties.Include(m => m.Model).Include(m => m.NavigationProperty).AsNoTracking();
            if (!string.IsNullOrEmpty(searchTerm))
            {
                dt = dt.Where(t => t.NameInModel.Contains(searchTerm) ||
                 t.NameInTable.Contains(searchTerm));
            }
            return View(await dt.ToListAsync());
        }

        // GET: System/Properties/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mproperty = await _context.Properties
                .Include(m => m.Model)
                .Include(m => m.NavigationProperty)
                .SingleOrDefaultAsync(m => m.Id == id);
            if (mproperty == null)
            {
                return NotFound();
            }

            return View(mproperty);
        }

        // GET: System/Properties/Create
        public IActionResult Create()
        {
            ViewData["ModelId"] = new SelectList(_context.Models, "Id", "Name");
            ViewData["NavigationPropertyId"] = new SelectList(_context.NavigationProperties, "Id", "Name");
            return View();
        }

        // POST: System/Properties/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ModelId,NameInModel,NameInTable,PropertyType,PropertyInDatabaseType,NotMapped,Size,Distinct,Nullable,NavigationPropertyId,PK,FK")] Property mproperty)
        {
            if (ModelState.IsValid)
            {
                _context.Add(mproperty);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewData["ModelId"] = new SelectList(_context.Models, "Id", "Name");
            ViewData["NavigationPropertyId"] = new SelectList(_context.NavigationProperties, "Id", "Name");
            return View(mproperty);
        }

        // GET: System/Properties/Edit/5
        public async Task<IActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mproperty = await _context.Properties.SingleOrDefaultAsync(m => m.Id == id);
            if (mproperty == null)
            {
                return NotFound();
            }
            ViewData["ModelId"] = new SelectList(_context.Models, "Id", "Name");
            ViewData["NavigationPropertyId"] = new SelectList(_context.NavigationProperties, "Id", "Name");
            return View(mproperty);
        }

        // POST: System/Properties/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("Id,ModelId,NameInModel,PK,FK,NameInTable,PropertyType,PropertyInDatabaseType,NotMapped,Size,Distinct,Nullable,NavigationPropertyId")] Property mproperty)
        {
            if (id != mproperty.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(mproperty);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PropertyExists(mproperty.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index");
            }
            ViewData["ModelId"] = new SelectList(_context.Models, "Id", "Name");
            ViewData["NavigationPropertyId"] = new SelectList(_context.NavigationProperties, "Id", "Name");
            return View(mproperty);
        }

        // GET: System/Properties/Delete/5
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mproperty = await _context.Properties
                .Include(m => m.Model)
                .Include(m => m.NavigationProperty)
                .SingleOrDefaultAsync(m => m.Id == id);
            if (mproperty == null)
            {
                return NotFound();
            }

            return View(mproperty);
        }

        // POST: System/Properties/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            var mproperty = await _context.Properties.SingleOrDefaultAsync(m => m.Id == id);
            _context.Properties.Remove(mproperty);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool PropertyExists(long id)
        {
            return _context.Properties.Any(e => e.Id == id);
        }
    }
}
