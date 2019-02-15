using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Engine.Absence.Models;
using Engine.Areas.Mobile.Models;

namespace Engine.Areas.Mobile.ViewModel
{
    public class ClockInViewModelResult : BaseViewModel
    {
    }

    public class ClockInViewModel : BaseViewModel
    {
        public long BiometricDataTimeId { get; set; }


        public List<ScanResult> scanResults { get; set; }

        public List<MyLocation> location { get; set; }


        public string qRCodeContent { get; set; }

        public long[] bitmapdata { get; set; }
        public DateTime? datetime { get; set; }
        public virtual BiometricDataTime BiometricDataTime { get; set; }
    }

    public class MyLocation
    {
        [Key] public long Id { get; set; }
        public long? ClockInViewModelId { get; set; }

        public float accuracy { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public float speed { get; set; }
        public long time { get; set; }
        public virtual ClockInViewModel ClockInViewModel { get; set; }

        public WorkplaceSetting WorkplaceSetting { get; set; }
        public long? WorkplaceSettingId { get; set; }


        public long? WorkplaceId { get; set; }
        public Workplace Workplace { get; set; }
    }

    public class ScanResult
    {
        [Key] public long Id { get; set; }

        public long? ClockInViewModelId { get; set; }


        public WorkplaceSetting WorkplaceSetting { get; set; }
        public long? WorkplaceSettingId { get; set; }


        /**
         * The network name.
         */
        public string SSID { get; set; }

        /**
         * Ascii encoded SSID. This will replace SSID when we deprecate it. @hide
         */
        public object wifiSsid { get; set; }

        /**
         * The address of the access point.
         */
        public string BSSID { get; set; }

        /**
         * The HESSID from the beacon.
         * @hide
         */
        public long hessid { get; set; }

        /**
         * The ANQP Domain ID from the Hotspot 2.0 Indication element, if present.
         * @hide
         */
        public int anqpDomainId { get; set; }

        /*
         * This field is equivalent to the |flags|, rather than the |capabilities| field
         * of the per-BSS scan results returned by WPA supplicant. See the definition of
         * |struct wpa_bss| in wpa_supplicant/bss.h for more details.
         */
        /**
         * Describes the authentication, key management, and encryption schemes
         * supported by the access point.
         */
        public string capabilities { get; set; }

        public int channelWidth { get; set; }

        /**
         * Not used if the AP bandwidth is 20 MHz
         * If the AP use 40, 80 or 160 MHz, this is the center frequency (in MHz)
         * if the AP use 80 + 80 MHz, this is the center frequency of the first segment (in MHz)
         */
        public int centerFreq0 { get; set; }

        /**
         * Only used if the AP bandwidth is 80 + 80 MHz
         * if the AP use 80 + 80 MHz, this is the center frequency of the second segment (in MHz)
         */
        public int centerFreq1 { get; set; }

        /**
         * @deprecated use is80211mcResponder() instead
         * @hide
         */
        public bool is80211McRTTResponder { get; set; }

        /**
         * timestamp in microseconds (since boot) when
         * this result was last seen.
         */
        public long timestamp { get; set; }

        /**
         * Timestamp representing date when this result was last seen, in milliseconds from 1970
         * {@hide}
         */
        public long seen { get; set; }
        public virtual ClockInViewModel ClockInViewModel { get; set; }
    }
}