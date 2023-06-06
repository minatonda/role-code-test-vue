import { AxiosInstance } from "axios";
import { ApiSwapiPaginationResponse } from "./types/api.type";

export class ApiSwapiPlanetsService {
    constructor(
        private axios: AxiosInstance
    ) {

    }

    public getPlanets(url: string = 'https://swapi.dev/api/planets') {
        const params: any = {};
        params['format'] = 'json';
        return this.axios.get<ApiSwapiPaginationResponse<Planet>>(url, {
            params: params
        });
    }
}

export interface Planet {
    climate: string;
    created: string;
    diameter: string;
    edited: string;
    films: string[];
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    residents: string[];
    rotation_period: string;
    surface_water: string;
    terrain: string;
    url: string;
}