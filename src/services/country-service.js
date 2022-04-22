
import axios from 'axios';

export const getCountries = async () => {

    try {
      return await axios.get("countries")     
    } catch (error) {
        console.log(error)
    }
};

export const getCountriesContaining = async (val) => {

    try {
        return await axios.get("countries/" + val)
    } catch (error) {
        console.log(error)
    }
};