import { IK_API_SWAPI_PLANETS_SERVICE, IK_AXIOS } from '@/provider';
import { ApiSwapiPlanetsService, Planet } from '@/provider/services/api-swapi-planets.service';
import { ApiSwapiPaginationResponse } from '@/provider/services/types/api.type';
import PlanetView from '@/views/PlanetView.vue';
import { faker } from '@faker-js/faker';
import { mount, shallowMount } from '@vue/test-utils';
import axios from 'axios';
import moxios from 'moxios';

function getMockResponse(nrows: number, next: string = undefined, previous: string = undefined): ApiSwapiPaginationResponse<Planet> {
  const rows: Planet[] = new Array(nrows).fill(1).map((i, idx) => {
    return {
      climate: faker.string.alpha(),
      created: faker.string.alpha(),
      diameter: faker.string.alpha(),
      edited: faker.string.alpha(),
      films: new Array(nrows).fill(1).map((i, idx) => faker.image.url()),
      gravity: faker.string.alpha(),
      name: faker.string.alpha(),
      orbital_period: faker.string.alpha(),
      population: faker.string.alpha(),
      residents: new Array(nrows).fill(1).map((i, idx) => faker.image.url()),
      rotation_period: faker.string.alpha(),
      surface_water: faker.string.alpha(),
      terrain: faker.string.alpha(),
      url: faker.string.alpha(),
    }
  });
  return {
    count: rows.length,
    next: next,
    previous: previous,
    results: rows
  };
}

function respondWith(response: any) {
  return new Promise((resolve, reject) => {
    moxios.wait(() => {
      moxios.requests.mostRecent().respondWith({
        status: 200,
        response,
      }).then(resolve, reject);
    });
  });
}

describe('PlanetView.vue', () => {

  const IK_AXIOS_INSTANCE = axios.create();

  beforeEach(() => moxios.install(IK_AXIOS_INSTANCE));
  afterEach(() => moxios.uninstall(IK_AXIOS_INSTANCE));

  [
    faker.number.int({ min: 1, max: 20 }),
    faker.number.int({ min: 1, max: 20 }),
    faker.number.int({ min: 1, max: 20 }),
    faker.number.int({ min: 1, max: 20 }),
    faker.number.int({ min: 1, max: 20 })
  ].forEach((nrows) => {

    it('renders should render $nrow Planet Cards'.replace('$nrow', nrows.toString()), async () => {

      const wrapper = shallowMount(PlanetView, {
        global: {
          provide: {
            [IK_AXIOS as symbol]: IK_AXIOS_INSTANCE,
            [IK_API_SWAPI_PLANETS_SERVICE as symbol]: new ApiSwapiPlanetsService(IK_AXIOS_INSTANCE)
          }
        },
        sync: false,
      });

      await respondWith(getMockResponse(nrows))

      await wrapper.vm.$nextTick();
      await wrapper.vm.$forceUpdate();

      expect(wrapper.findAll('div.card').length).toEqual(nrows);

    }, 30000);

  });

  it('renders should render without previous button', async () => {

    const wrapper = shallowMount(PlanetView, {
      global: {
        provide: {
          [IK_AXIOS as symbol]: IK_AXIOS_INSTANCE,
          [IK_API_SWAPI_PLANETS_SERVICE as symbol]: new ApiSwapiPlanetsService(IK_AXIOS_INSTANCE)
        }
      },
      sync: false,
    });

    await respondWith(getMockResponse(20, 'https://swapi.dev/api/planets', undefined))

    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();

    expect(wrapper.html()).toContain('Next');
    expect(wrapper.html()).not.toContain('Previous');
    expect(wrapper.findAll('div.card').length).toEqual(20);

  }, 30000);

  it('renders should render without next button', async () => {

    const wrapper = shallowMount(PlanetView, {
      global: {
        provide: {
          [IK_AXIOS as symbol]: IK_AXIOS_INSTANCE,
          [IK_API_SWAPI_PLANETS_SERVICE as symbol]: new ApiSwapiPlanetsService(IK_AXIOS_INSTANCE)
        }
      },
      sync: false,
    });

    await respondWith(getMockResponse(20, undefined, 'https://swapi.dev/api/planets'))

    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();

    expect(wrapper.html()).not.toContain('Next');
    expect(wrapper.html()).toContain('Previous');
    expect(wrapper.findAll('div.card').length).toEqual(20);

  }, 30000);

  it('should call doLoadNextPlanets and doSetupPlanets when click on #button-next', async () => {

    const wrapper = shallowMount(PlanetView, {
      global: {
        provide: {
          [IK_AXIOS as symbol]: IK_AXIOS_INSTANCE,
          [IK_API_SWAPI_PLANETS_SERVICE as symbol]: new ApiSwapiPlanetsService(IK_AXIOS_INSTANCE)
        }
      },
      sync: false,
    });

    await respondWith(getMockResponse(20, 'next', 'previous'))

    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();

    const spyDoLoadNextPlanets = jest.spyOn(wrapper.vm, 'doLoadNextPlanets');
    const spyDoSetupPlanets = jest.spyOn(wrapper.vm, 'doSetupPlanets');

    wrapper.find('a#button-next').trigger('click');

    expect(spyDoLoadNextPlanets).toHaveBeenCalled();
    expect(spyDoSetupPlanets).toHaveBeenCalledWith('next');

  }, 30000);

  it('should call doLoadPreviousPlanets and doSetupPlanets when click on #button-prev', async () => {

    const wrapper = shallowMount(PlanetView, {
      global: {
        provide: {
          [IK_AXIOS as symbol]: IK_AXIOS_INSTANCE,
          [IK_API_SWAPI_PLANETS_SERVICE as symbol]: new ApiSwapiPlanetsService(IK_AXIOS_INSTANCE)
        }
      },
      sync: false,
    });

    await respondWith(getMockResponse(20, 'next', 'previous'))

    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();

    const spyDoLoadPreviousPlanets = jest.spyOn(wrapper.vm, 'doLoadPreviousPlanets');
    const spyDoSetupPlanets = jest.spyOn(wrapper.vm, 'doSetupPlanets');

    wrapper.find('a#button-prev').trigger('click');

    expect(spyDoLoadPreviousPlanets).toHaveBeenCalled();
    expect(spyDoSetupPlanets).toHaveBeenCalledWith('previous');

  }, 30000);

});
