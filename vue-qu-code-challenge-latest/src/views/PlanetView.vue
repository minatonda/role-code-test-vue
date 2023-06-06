<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <template v-if="lPlanets">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" v-if="lPlanets?.previous">
            <a id="button-prev" class="page-link" href="#" @click="doLoadPreviousPlanets()">
              <span>Previous</span>
              <div class="spinner-border text-primary spinner-border-sm ms-2" role="status"
                v-if="isLoading(doLoadPreviousPlanets)">
                <span class="visually-hidden">Loading...</span>
              </div>
            </a>
          </li>
          <li class="page-item" v-if="lPlanets?.next">
            <a id="button-next" class="page-link" href="#" @click="doLoadNextPlanets()">
              <span>Next</span>
              <div class="spinner-border text-primary spinner-border-sm ms-2" role="status"
                v-if="isLoading(doLoadNextPlanets)">
                <span class="visually-hidden">Loading...</span>
              </div>
            </a>
          </li>
        </ul>
      </nav>
      <div class="w-100 row">
        <template v-for="(planet, index) in lPlanets.results" :key="index">
          <div class="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-2 mb-2">
            <div class="card w-100">
              <div class="card-header d-flex flex-column align-items-start">
                <b>{{ planet.name }}</b>
              </div>
              <div class="card-body d-flex flex-column align-items-start">
                <small class="mb-1 text-start">
                  <b>Diameter:</b>
                  <span class="ms-1">{{ planet.diameter }}</span>
                </small>
                <small class="mb-1 text-start">
                  <b>Gravity:</b>
                  <span class="ms-1">{{ planet.gravity }}</span>
                </small>
                <small class="mb-1 text-start">
                  <b>Population:</b>
                  <span class="ms-1">{{ planet.population }}</span>
                </small>
                <small class="mb-1 text-start">
                  <b>Climate:</b>
                  <span class="ms-1">{{ planet.climate }}</span>
                </small>
                <small class="mb-1 text-start">
                  <b>Terrain:</b>
                  <span class="ms-1">{{ planet.terrain }}</span>
                </small>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
// import ApiSwapiPaginator from '@/components/ApiSwapiPaginator.vue'; // @ is an alias to /src
import { IK_API_SWAPI_PLANETS_SERVICE } from '@/provider';
import { ApiSwapiPlanetsService, Planet } from '@/provider/services/api-swapi-planets.service';
import { ApiSwapiPaginationResponse } from '@/provider/services/types/api.type';
import { defineComponent, inject } from 'vue';

interface ComponentData {
  apiSwapiPlanetsService: ApiSwapiPlanetsService,
  loadings: Set<any>,
  lPlanets: ApiSwapiPaginationResponse<Planet>;
}

export default defineComponent({
  name: 'PlanetView',
  data: (): ComponentData => {
    return {
      apiSwapiPlanetsService: inject(IK_API_SWAPI_PLANETS_SERVICE),
      loadings: new Set(),
      lPlanets: undefined
    };
  },
  methods: {
    doSetupPlanets(url: string = undefined) {
      return this.apiSwapiPlanetsService.getPlanets(url)
        .then((response) => {
          this.lPlanets = response.data;
        })
    },
    doLoadNextPlanets() {
      this.loadings.add(this.doLoadNextPlanets);
      return this.doSetupPlanets(this.lPlanets.next)
        .finally(() => this.loadings.delete(this.doLoadNextPlanets));
    },
    doLoadPreviousPlanets() {
      this.loadings.add(this.doLoadPreviousPlanets);
      return this.doSetupPlanets(this.lPlanets.previous)
        .finally(() => this.loadings.delete(this.doLoadPreviousPlanets));
    },
    isLoading(key: any) {
      return this.loadings.has(key);
    }
  },
  mounted() {
    this.doSetupPlanets();
  }
});
</script>