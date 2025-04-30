import { mount } from "svelte";
import "./app.css";
import { Toaster } from "$lib/utils/toast";
import { problemPage } from "./problems";
import { explorePage } from "./explore";

mount(Toaster, {
    target: document.body,
    props: { richColors: true, position: "top-center" },
});

const url = window.location.href;

if (url.includes("problems")) {
    problemPage();
} else if (url.includes("explore/learn")) {
    explorePage();
}
