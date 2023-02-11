using RestSharp;

namespace backend.Utils
{
  public class Utilitario
  {    
    public async Task<bool> ValidaCEP(string cep)
    {
      string urlReq = $"http://cep.la";
      var client = new RestClient(urlReq);
      var request = new RestRequest($"/{cep}", Method.Get);

      request.AddHeader("Accept", "text/plain");

      var response = await client.ExecuteAsync(request);

      if(response.Content!.Length == 0) {
        return false;
      }

      return true;
    }
  }
}