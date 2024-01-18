<script setup lang="ts">
    import { theme as usedTheme, list_themes, changeTheme } from "../vuex-store/theme";
</script>

<template>
    <div class="navbar bg-base-300 flex justify-between">
        <div class="">
            <!-- <router-link class="btn btn-ghost" to="/">Home</router-link> | -->
            <router-link class="btn btn-ghost" to="/graph">Graph</router-link>
            <!-- <router-link class="btn btn-ghost" to="/about">About</router-link> | -->
            <!-- <router-link class="btn btn-ghost" to="/non-existent-path">Broken Link</router-link> -->
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
