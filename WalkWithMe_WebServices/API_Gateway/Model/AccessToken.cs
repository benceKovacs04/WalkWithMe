using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Gateway.Model
{
    public class AccessToken
    {
        public string token_type { get; set; }
        public string access_token { get; set; }
        public string expires_in { get; set; }
    }
}
