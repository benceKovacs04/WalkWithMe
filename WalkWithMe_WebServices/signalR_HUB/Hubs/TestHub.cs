using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using signalR_HUB.ConnectionMapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalR_HUB.Hubs
{
    [Authorize]
    public class TestHub : Hub
    {
        private readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message + " : this is from the server");
        }

        public override Task OnConnectedAsync()
        {
            string name = Context.User.Identity.Name;

            _connections.Add(name, Context.ConnectionId);

            return base.OnConnectedAsync();
        }
    }
}
