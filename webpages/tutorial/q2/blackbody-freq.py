import math

def blackbody_intensity_frequency(temperature, frequency):
    """Calculate the intensity from blackbody radiation as 
       a function of temperature and frequency

       Parameters
       ----------
       temperature: float
          temperature in K of source emitting as a blackbody

       frequency: float
          frequency in Hz to calculate the intensity at

       Returns
       -------
       Intensity: float
          Intensity of blackbody radiation in ergs/cm^2/sr/s/Hz
 

    """
    h = 6.62e-27 #erg*s
    c = 2.998e10 #c in cm/s
    k = 1.38e-16 #erg/K
    intensity = 2 * h * f**3 / c**2 /
                (np.exp(h*frequency/k/temperature) - 1)
    return intensity

