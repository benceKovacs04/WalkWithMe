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
    public class NotificationHub : Hub
    {
        private readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();
        public async Task SendWalkNotification(string toSend)
        {
            if (toSend == Context.User.Identity.Name)
            {
                return;
            }
            var userConnections = _connections.getConnection(toSend);
            
            foreach (var connection in userConnections)
            {
                await Clients.Client(connection).SendAsync("ReceiveWalkNotification", Context.User.Identity.Name);
            }
            
        }

        public override Task OnConnectedAsync()
        {
            string name = Context.User.Identity.Name;

            _connections.Add(name, Context.ConnectionId);

            return base.OnConnectedAsync();
        }
    }
}
