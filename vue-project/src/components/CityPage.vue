<template>
    <div class="main-container">
        <h1 style="color: black;">{{ city.name }}</h1>
        <div>
            <div>
                <div style="display: flex; flex-direction: row;">
                    <div>
                        <div>
                            <p style="color: lightgreen;">Al aire libre</p>
                            <p style="color: gray;">
                                Santiago es una ciudad que se caracteriza por tener una gran cantidad de parques y
                                cerros, los cuales son ideales para disfrutar de un día al aire libre.
                            </p>
                        </div>
                        <div>
                            <p style="color: lightgreen;">Curiosidad</p>
                            <p style="color: green;">
                                Sabías que Santiago es la capital de Chile y una de las ciudades más grandes de América
                                Latina.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <!-- Population, sectors, area -->
                            <div style="display: flex; flex-wrap: wrap;">
                                <div v-for="(value, key) in city" :key="key"
                                    style="flex: 1 0 50%; display: flex; flex-direction: column; border: 1px solid #ccc; padding-right: 10px;">
                                    <div>
                                        <p style="color: black">{{ key }}</p>
                                        <p style="color: gray;">{{ value }}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div>
                    <h1 class="event-title">Lo más buscado</h1>
                    <div>
                        <div v-for="event in hotEvents" :key="event.id" class="event-container">
                            <a :href="'/events/' + event.name">
                                <div class="ml-6">
                                    <h4 style="color: darkgreen;">{{ event.name }}</h4>
                                    <p style="color: gray;">{{ event.description }}</p>
                                    <span style="color: lightgreen;"> {{ event.sector }}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>


                <div>
                    <h1 class="event-title">Cerros</h1>
                    <div>
                        <div v-for="event in hills" :key="event.id" class="event-container">
                            <a :href="'/events/' + event.name">
                                <div class="ml-6">
                                    <h4 style="color: darkgreen;">{{ event.name }}</h4>
                                    <p style="color: gray;">{{ event.description }}</p>
                                    <span style="color: lightgreen;"> {{ event.sector }}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 class="event-title">Parques</h1>
                    <div>
                        <div v-for="event in parks" :key="event.id" class="event-container">
                            <a :href="'/events/' + event.name">
                                <div class="ml-6">
                                    <h4 style="color: darkgreen;">{{ event.name }}</h4>
                                    <p style="color: gray;">{{ event.description }}</p>
                                    <span style="color: lightgreen;"> {{ event.sector }}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 class="event-title">Todos los eventos</h1>
                    <div>
                        <div v-for="event in allEvents" :key="event.id" class="event-container">
                            <a :href="'/events/' + event.name">
                                <div class="ml-6">
                                    <h4 style="color: darkgreen;">{{ event.name }}</h4>
                                    <p style="color: gray;">{{ event.description }}</p>
                                    <span style="color: lightgreen;"> {{ event.sector }}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CityPage',
    data() {
        return {
            city: {
                name: 'Santiago',
                population: 7,
                sectors: 32,
                area: 641,
                hills: 26,
                parks: 6,
                museums: 12,
            },
            hotEvents: [
                { name: 'Evento 1', description: 'Descripción del evento 1', sector: 'Sector 1' },
                { name: 'Evento 2', description: 'Descripción del evento 2', sector: 'Sector 2' },
                { name: 'Evento 3', description: 'Descripción del evento 3', sector: 'Sector 3' }
            ],
            parks: [
                { name: 'Evento 1', description: 'Descripción del evento 1', sector: 'Sector 1' },
                { name: 'Evento 2', description: 'Descripción del evento 2', sector: 'Sector 2' },
                { name: 'Evento 3', description: 'Descripción del evento 3', sector: 'Sector 3' }
            ],
            hills: [
                { name: 'Evento 1', description: 'Descripción del evento 1', sector: 'Cerro San Cristobal' },
                { name: 'Evento 2', description: 'Descripción del evento 2', sector: 'Cerro Santa Lucia' },
                { name: 'Evento 3', description: 'Descripción del evento 3', sector: 'Cerro Manquehue' }
            ],
            allEvents: [
                { name: 'Evento 1', description: 'Descripción del evento 1', sector: 'Sector 1' },
                { name: 'Evento 2', description: 'Descripción del evento 2', sector: 'Sector 2' },
                { name: 'Evento 3', description: 'Descripción del evento 3', sector: 'Sector 3' }
            ]
        };
    }
};
</script>

<style scoped>
.event-title {
    color: black;
    height: 30%;
}

.event-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border-left: 1px dashed #ccc;
}
</style>