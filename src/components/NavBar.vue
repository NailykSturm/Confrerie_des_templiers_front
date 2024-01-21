<script setup lang="ts">
    import { theme as usedTheme, list_themes, changeTheme } from "../vuex-store/theme";
    import { history, fetchGraph, goHistoryBack, goHistoryBackIndex } from "../vuex-store/useGraph";
    import { listConcepts, fetchConcepts } from "../vuex-store/concepts";
    import { onMounted } from "vue";

    onMounted(() => {
        fetchConcepts();
    });
</script>

<template>
    <div class="navbar bg-base-300 flex justify-between">
        <div class="">
            <router-link class="btn btn-ghost" to="/graph">Graph</router-link>
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">Concept</div>
                <ul
                    tabindex="0"
                    class="menu dropdown-content z-[2] p-2 shadow bg-base-200 rounded-box w-96 mt-4 overflow-auto max-h-64">
                    <li v-for="concept in listConcepts">
                        <a v-on:click="fetchGraph(concept)">{{ concept }}</a>
                    </li>
                </ul>
            </div>
        </div>

        <div>
            <div>
                <button class="btn" v-on:click="goHistoryBack()">
                    <img :width="16" src="../assets/imgs/back.png" />
                </button>
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">Historique</div>
                    <ul
                        tabindex="0"
                        class="menu dropdown-content z-[2] p-2 shadow bg-base-200 rounded-box w-96 mt-4 overflow-auto max-h-64">
                        <li v-for="(histo, index) in history">
                            <a v-on:click="goHistoryBackIndex(index)">{{ histo }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <button class="btn" v-on:click="fetchGraph()">
                <img :width="16" src="../assets/imgs/rafraichir.png" />
            </button>
        </div>

        <div>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost rounded-btn">Theme</label>
                <div
                    tabindex="0"
                    class="menu dropdown-content z-[2] p-2 shadow bg-base-200 rounded-box w-52 mt-4 overflow-auto max-h-64">
                    <ul>
                        <li v-for="themeCategory in list_themes">
                            <details>
                                <summary>{{ themeCategory[0] }}</summary>
                                <ul>
                                    <li
                                        v-for="theme in themeCategory"
                                        @click="changeTheme(theme)"
                                        class="rounded-box"
                                        v-bind:class="theme == usedTheme ? 'bg-base-100' : ''">
                                        <a>{{ theme }}</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
