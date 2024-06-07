<template>
    <div class="main-container">
        <div class="main-info">
            <div class="indicators" @appear="handleAppear">
                <div class="mb-10 pl-10">
                    <h1>{{ event.name }}</h1>
                    <p>{{ event.sector }}</p>
                </div>
                <div v-for="indicator in indicators" :key="indicator.name" class="flex items-center pl-10">
                    <h2>{{ indicator.name }}</h2>
                    <div class="grid w-full overflow-x-hidden rounded-lg p-6 lg:overflow-visible">
                        <div class="flex items-center gap-2 font-bold text-blue-gray-500">
                            {{ indicator.value }}
                            <div class="inline-flex items-center">
                                <span v-for="i in 5" :key="i">
                                    <svg v-if="i <= indicator.value" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="lightblue" class="w-6 h-6">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightblue" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                                    </svg>
                                </span>
                            </div>
                            <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">{{ indicator.reviews }} Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="descriptions" @appear="handleAppear">
                <div class="descriptions-content">
                    <h2 class="p-4">Información de utilidad</h2>
                    <div v-for="description in descriptions" :key="description.id" class="description-item">
                        <button class="accordion" @click="toggleDescription(description.id)">
                            <div class="accordion-title">
                                <div class="flex items-center">
                                    <img :src="`/src/lib/icons/descriptions/${description.icon}.png`" alt="Icon" class="w-6 h-6" />
                                    <p class="ml-2">{{ description.name }}</p>
                                </div>
                            </div>
                            <span class="accordion-icon">
                                <img :src="openDescriptions.has(description.id) ? '/src/lib/icons/minus.svg' : '/src/lib/icons/plus.svg'" alt="Toggle" class="w-6 h-6" />
                            </span>
                        </button>
                        <div v-if="openDescriptions.has(description.id)" class="description">
                            <p>{{ description.value }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="Map_and_info_container" @appear="handleAppear">
            <div class="map-info">
                <div class="map-title">
                    <h1>¿Cómo llegar al lugar?</h1>
                    <p>Te tenemos algunos datos</p>
                </div>
                <div class="map-description">
                    <p>Dirección: {{ event.address }}</p>
                    <p>Telefono de Contacto: {{ event.phone }}</p>
                    <p>Mail de contacto: {{ event.email }}</p>
                    <p>Descripción del Evento: {{ event.additional_info }}</p>
                </div>
            </div>
        </div>
        <div class="comments-container mt-10">
            <h2 class="p-4">Comentarios</h2>
            <div class="comments-content">
                <div v-for="comment in comments" :key="comment.id" class="comment-item">
                    <p class="block font-sans text-base font-medium leading-relaxed antialiased text-blue-gray-900">{{ comment.message }}</p>
                    <p class="block font-sans text-base font-medium leading-relaxed antialiased text-blue-gray-500">- {{ comment.name }}</p>
                </div>
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="message">Comentario:</label>
                    <textarea id="message" v-model="newComment.message" required></textarea>
                </div>
                <div class="form-group">
                    <label for="rating">Rating:</label>
                    <input type="number" id="rating" v-model="newComment.rating" min="0" max="5" required />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
    setup() {
        const event = ref({});
        const indicators = ref([]);
        const descriptions = ref([]);
        const comments = ref([]);
        const openDescriptions = ref(new Set());
        const newComment = ref({ message: '', rating: 0 });

        const fetchEventData = async (id) => {
            try {
                const res = await fetch(`http://52.2.71.125:8000/events/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch event data');
                }
                return await res.json();
            } catch (error) {
                console.error("Error loading event data:", error);
                return {};
            }
        };

        const postComment = async (comment) => {
            try {
                const res = await fetch('http://52.2.71.125:8000/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(comment),
                });
                if (!res.ok) {
                    throw new Error('Failed to post comment');
                }
                return await res.json();
            } catch (error) {
                console.error("Error posting comment:", error);
                return null;
            }
        };

        const fetchComments = async (id) => {
            try {
                const res = await fetch(`http://52.2.71.125:8000/comments`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const commentsData = await res.json();
                return commentsData.filter((comment) => comment.event_id === id);
            } catch (error) {
                console.error("Error fetching comments:", error);
                return [];
            }
        };

        onMounted(async () => {
            const id = window.location.pathname.split('/').pop();
            const data = await fetchEventData(id);
            const commentsData = await fetchComments(id);

            event.value = data;
            indicators.value = data.indicators || [];
            descriptions.value = data.descriptions || [];
            comments.value = commentsData || [];
        });

        const handleSubmit = async () => {
            const id = window.location.pathname.split('/').pop();
            const commentData = { ...newComment.value, event_id: id };
            const postedComment = await postComment(commentData);
            if (postedComment) {
                comments.value.push(postedComment);
                newComment.value = { message: '', rating: 0 };
            }
        };

        const toggleDescription = (id) => {
            if (openDescriptions.value.has(id)) {
                openDescriptions.value.delete(id);
            } else {
                openDescriptions.value.add(id);
            }
        };

        return {
            event,
            indicators,
            descriptions,
            comments,
            openDescriptions,
            newComment,
            handleSubmit,
            toggleDescription
        };
    }
};
</script>

<style scoped>
/* Add your styles here */
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1% 0;
    width: 100%;
}

.main-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1% 0;
    width: 100%;
}

.indicators {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.descriptions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5% 0;
    width: 100%;
}

.descriptions-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1%;
    width: 90%;
    max-width: 1200px;
    border-radius: 2%;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}

.description-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.description {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
}

.accordion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    margin: 5px 0;
}

.map-info {
    padding: 20px 0;
    width: 100%;
    border-top: gray 2px dashed;
    border-bottom: gray 2px dashed;
}

.map-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 100%;
}

.map-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5% 0;
    width: 100%;
}

.comments-container {
    width: 90%;
    max-width: 800px;
    margin: auto;
}

.form-group {
    margin-bottom: 15px;
}

.Map_and_info_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

@media (min-width: 768px) {
    .main-info {
        flex-direction: row;
        margin: 1% 0;
        width: 100%;
    }

    .indicators {
        width: 50%;
    }

    .descriptions {
        width: 50%;
        margin: 5% 0;
    }

    .Map_and_info_container {
        flex-direction: row;
    }

    .map-info {
        width: 50%;
        padding: 40px 0;
    }

    .map-description {
        width: 50%;
    }
}
</style>
