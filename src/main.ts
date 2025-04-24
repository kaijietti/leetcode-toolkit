import { mount } from "svelte";
import "./app.css";
import { Toaster } from "$lib/utils/toast";
import { problemPage } from "./problems";

mount(Toaster, {
    target: document.body,
    props: { richColors: true, position: "top-center" },
});

const url = window.location.href;

if (url.includes("problems")) {
    problemPage();
}
