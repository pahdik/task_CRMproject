using contacts.Data;
using contacts.Dtos;
using contacts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace contacts.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly DataContext _context;
        public ContactsController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var cont=await _context.Contacts.FirstAsync(x => x.Id == 2);
            Console.WriteLine(cont.BirthDate.ToString("dd/MM/yyyy"));
            return await _context.Contacts.FirstAsync(x => x.Id == id);
        }
        [HttpGet]
        public async Task<ActionResult<List<Contact>>> Get()
        {
            return await _context.Contacts.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<List<Contact>>> Create(Contact contact)
        {
            contact.Id = 0;
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return await Get();

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Contact>>> Delete(int id)
        {
            var contact=await _context.Contacts.FirstAsync(x=>x.Id==id);
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return await Get();
        }
        [HttpPut]
        public async Task<ActionResult<List<Contact>>> Put(Contact updateContact)
        {
            var contact= await _context.Contacts.FirstAsync(x=>x.Id==updateContact.Id);
            contact.MobilePhone = updateContact.MobilePhone;
            contact.BirthDate = updateContact.BirthDate;
            contact.Name = updateContact.Name;
            await _context.SaveChangesAsync();
            return await Get();
        }
        
    }
}