<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <template v-if="lPlanets">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" v-if="lPlanets?.previous"><a class="page-link" href="#"
              @click="doLoadPreviousPlanets()">Previous</a></li>
          <li class="page-item" v-if="lPlanets?.next"><a class="page-link" href="#" @click="doLoadNextPlanets()">Next</a>
          </li>
        </ul>
      </nav>
      <div class="w-100 row">
        <template v-for="(planet, index) in lPlanets.results" :key="index">
          <div class="col-2 mb-2">
            <div class="card" style="width: 300px;">
              <div class="card-header d-flex flex-column align-items-start">
                {{ planet.name }}
              </div>
              <div class="card-body d-flex flex-column align-items-start">
                <small class="mb-1 text-start">
                  <b>Diameter:</b>
                  <span class="ms-1">{{ planet.diameter }}</span>
                </small>
                <small  class="mb-1 text-start">
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
  lPlanets: ApiSwapiPaginationResponse<Planet>;
}

export default defineComponent({
  name: 'HomeView',
  // components: {
  //   ApiSwapiPaginator
  // },
  data: (): ComponentData => {
    return {
      apiSwapiPlanetsService: inject(IK_API_SWAPI_PLANETS_SERVICE),
      lPlanets: undefined
    };
  },
  methods: {
    doSetupPlanets(url: string = undefined) {
      const rlPlanets = this.lPlanets;
      this.lPlanets = undefined;

      return this.apiSwapiPlanetsService.getPlanets(url)
        .then((response) => {
          this.lPlanets = response.data;
        })
        .catch((error) => {
          this.lPlanets = rlPlanets;
        })
    },
    doLoadNextPlanets() {
      return this.doSetupPlanets(this.lPlanets.next);
    },
    doLoadPreviousPlanets() {
      return this.doSetupPlanets(this.lPlanets.previous);
    }
  },
  mounted() {
    this.doSetupPlanets();
  }
});
</script>
<style>
.caroussel-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow-x: auto;
}
</style>