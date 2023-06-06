
import { AxiosInstance } from "axios";
import { InjectionKey } from "vue";
import { ApiSwapiPlanetsService } from "./services/api-swapi-planets.service";
import { provide } from 'vue';
import axios from 'axios';

export const IK_AXIOS = Symbol() as InjectionKey<AxiosInstance>;
export const IK_API_SWAPI_PLANETS_SERVICE = Symbol() as InjectionKey<ApiSwapiPlanetsService>;

export function Setup() {
    const IK_AXIOS_INSTANCE = axios.create();
    provide(IK_AXIOS, IK_AXIOS_INSTANCE);
    provide(IK_API_SWAPI_PLANETS_SERVICE, new ApiSwapiPlanetsService(IK_AXIOS_INSTANCE));
}