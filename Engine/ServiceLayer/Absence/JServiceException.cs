using System;

namespace ServiceLayer.Absence
{
    public class JServiceException : Exception
    {
        public JServiceException(string msg): base(msg)
        {
            
        }
    }
}