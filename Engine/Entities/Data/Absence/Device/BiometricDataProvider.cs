namespace Engine.Absence.Device
{
    public class BiometricDataProvider
    {
        public IBiometricRepository _Repository { get; set; }

        public BiometricDataProvider()
        {
            _Repository=new CommonBiometricRepository();
        }
        
    }
}