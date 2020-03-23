import {LitElement, customElement, property, css} from "lit-element";
import {nothing, html, svg} from "lit-html";
import {styleMap} from 'lit-html/directives/style-map';
import {classMap} from 'lit-html/directives/class-map';
import {repeat} from 'lit-html/directives/repeat';
import watch_css from "./watch.css";
import common_css from "@components/common/common.css";
import player_css from "@components/pages/topic/sections/player-section.css";
import {SelectSectionEvent, Section} from "@events/events";
import {Path} from "@settings/settings";
import {getScale} from "@settings/settings";

type SelectHandler = (section:Section) => any;

@customElement("section-watch")
export class _ extends LitElement {
    static styles = [common_css,player_css, watch_css];

    @property( { type : String }  ) topic = "";
    @property( { type : String }  ) ids_json = "";
    @property( { type : String }  ) current_id = "";
    @property( { type : String }  ) topic_id = "";
    @property( { type : Array }  ) ids = [] as Array<string>; 

    firstUpdated() {
        this.ids = JSON.parse(this.ids_json);

        this.current_id = this.ids[0];
    }

    render() {

        let ids = this.ids;

        //for testing scrolling
        //ids = [...ids, ...ids, ...ids, ...ids, ...ids, ...ids];


        const on_select = (id:string) => {
            this.current_id = id;
        }


        return html`
            <main>
                <div class="left">
                    <div class="left-contents widescreen">
                        ${video(this.current_id)}
                    </div>
                </div>
                <div class="right">
                    <ul>
                        ${ids.map(id => thumb(this.topic_id, id, this.current_id, on_select))}
                    </ul>
                </div>
            </main>
        `;
    }
}

const thumb = (topic: string, id:string, current_id: string, on_select: (id:string) => any) => {

    const get_thumb_src = () => {
        //old: Path.topic(topic) (`watch/${id}.jpg`)
        return `https://img.youtube.com/vi/${id}/0.jpg`
    }
    return html`
    <li @click=${() => on_select(id)}>
        <img class=${classMap({selected: current_id === id})} src=${get_thumb_src()} />
    </li>
    `;
}
const video = (id:string) => html`
    <iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`