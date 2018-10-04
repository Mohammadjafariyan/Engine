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
    public class NavigationPropertiesController : Controller
    {
        private readonly EngineContext _context;

        public NavigationPropertiesController(EngineContext context)
        {
            _context = context;    
        }

        // GET: System/NavigationProperties
        public async Task<IActionResult> Index(string searchTerm)
        {
            ViewData["searchTerm"] = searchTerm;
            var dt = _context.NavigationProperties.Include(n => n.Model).Include(n => n.Prev).AsNoTracking();
            if (!string.IsNullOrEmpty(searchTerm))
            {
                dt = dt.Where(t => t.Name.Contains(searchTerm) ||
                 t.Property.NameInModel.Contains(searchTerm) ||
                 t.Property.NameInTable.Contains(searchTerm));
            }
            return View(await dt.ToListAsync());
        }

        // GET: System/NavigationProperties/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var navigationProperty = await _context.NavigationProperties
                .Include(n => n.Model)
                .Include(n => n.Prev)
                .SingleOrDefaultAsync(m => m.Id == id);
            if (navigationProperty == null)
            {
                return NotFound();
            }

            return View(navigationProperty);
        }

        // GET: System/NavigationProperties/Create
        public IActionResult Create()
        {
            ViewData["ModelId"] = new SelectList(_context.Models, "Id", "Id");
            ViewData["PrevId"] = new SelectList(_context.NavigationProperties, "Id", "Id");
            return View();
        }

        // POST: System/NavigationProperties/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ModelId,PrevId,Name,NavigationPropertyType")] NavigationProperty navigationProperty)
        {
            if (ModelState.IsValid)
            {
                _context.Add(navigationProperty);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewData["ModelId"] = new SelectList(_context.Models, "Id", "Id", navigationProperty.ModelId);
            ViewData["PrevId"] = new SelectList(_context.NavigationProperties, "Id", "Id", navigationProperty.PrevId);
            return View(navigationProperty);
        }

        // GET: System/NavigationProperties/Edit/5
        public async Task<IActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var navigationProperty = await _context.NavigationProperties.SingleOrDefaultAsync(m => m.Id == id);
            if (navigationProperty == null)
            {
                return NotFound();
            }
            ViewData["ModelId"] = new SelectList(_context.Models, "Id", "Id", navigationProperty.ModelId);
            ViewData["PrevId"] = new SelectList(_context.NavigationProperties, "Id", "Id", navigationProperty.PrevId);
            return View(navigationProperty);
        }

        // POST: System/NavigationProperties/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("Id,ModelId,PrevId,Name,NavigationPropertyType")] NavigationProperty navigationProperty)
        {
            if (id != navigationProperty.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(navigationProperty);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NavigationPropertyExists(navigationProperty.Id))
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
            ViewData["ModelId"] = new SelectList(_context.Models, "Id", "Id", navigationProperty.ModelId);
            ViewData["PrevId"] = new SelectList(_context.NavigationProperties, "Id", "Id", navigationProperty.PrevId);
            return View(navigationProperty);
        }

        // GET: System/NavigationProperties/Delete/5
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var navigationProperty = await _context.NavigationProperties
                .Include(n => n.Model)
                .Include(n => n.Prev)
                .SingleOrDefaultAsync(m => m.Id == id);
            if (navigationProperty == null)
            {
                return NotFound();
            }

            return View(navigationProperty);
        }

        // POST: System/NavigationProperties/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            var navigationProperty = await _context.NavigationProperties.SingleOrDefaultAsync(m => m.Id == id);
            _context.NavigationProperties.Remove(navigationProperty);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool NavigationPropertyExists(long id)
        {
            return _context.NavigationProperties.Any(e => e.Id == id);
        }
    }
}
