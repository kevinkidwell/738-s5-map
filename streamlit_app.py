import streamlit as st
import pandas as pd
import plotly.express as px

# --- Page config ---
st.set_page_config(page_title="Alliance Map", layout="wide")

# --- Placeholder data ---
NUM_SQUARES = 1989
df = pd.DataFrame({
    "id": range(NUM_SQUARES),
    "type": ["Stronghold"] * NUM_SQUARES,
    "level": [1] * NUM_SQUARES,
    "current": [None] * NUM_SQUARES,
    "first_capture": [None] * NUM_SQUARES,
    "final_capture": [None] * NUM_SQUARES,
    "row": [i // 45 for i in range(NUM_SQUARES)],
    "col": [i % 45 for i in range(NUM_SQUARES)]
})

# --- Session state ---
if "alliances" not in st.session_state:
    st.session_state.alliances = {
        "Alliance A": "#FF5733",
        "Alliance B": "#33C1FF",
        "Alliance C": "#9D33FF"
    }

if "dates" not in st.session_state:
    st.session_state.dates = ["2025-11-01", "2025-11-15", "2025-12-01"]

# --- Tabs ---
tab1, tab2, tab3 = st.tabs(["🗺️ Map", "🎨 Alliance Manager", "📅 Date Settings"])

# --- Map Tab ---
with tab1:
    st.subheader("Alliance Map")

    def get_color(alliance):
        return st.session_state.alliances.get(alliance, "#CCCCCC")

    df["color"] = df["current"].apply(get_color)
    df["label"] = df.apply(lambda row: f"{row['type'][:2]} Lv.{row['level']}", axis=1)

    fig = px.scatter(
        df, x="col", y="row", text="label",
        color="color", hover_data=["id", "type", "level", "current"],
        color_discrete_map="identity"
    )
    fig.update_traces(marker=dict(size=12), textposition="middle center")
    fig.update_layout(
        showlegend=False,
        margin=dict(l=0, r=0, t=0, b=0),
        xaxis=dict(visible=False),
        yaxis=dict(visible=False)
    )
    fig.update_yaxes
