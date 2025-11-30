import streamlit as st
import plotly.express as px
import pandas as pd

# --- Placeholder data ---
num_squares = 1989
df = pd.DataFrame({
    "id": range(num_squares),
    "type": ["Stronghold"] * num_squares,
    "level": [1] * num_squares,
    "current": [None] * num_squares,
    "first_capture": [None] * num_squares,
    "final_capture": [None] * num_squares,
    "row": [i // 45 for i in range(num_squares)],   # placeholder layout
    "col": [i % 45 for i in range(num_squares)]
})

# --- Sidebar: Alliance manager ---
st.sidebar.header("Alliance Manager")
alliances = {}
num_alliances = st.sidebar.number_input("Number of alliances", 1, 10, 3)
for i in range(num_alliances):
    name = st.sidebar.text_input(f"Alliance {i+1} name", f"Alliance {i+1}")
    color = st.sidebar.color_picker(f"{name} base color", "#4a90e2")
    alliances[name] = color

# --- Shade logic (simplified demo) ---
def generate_shades(hex_color):
    return [hex_color, hex_color, hex_color]  # placeholder, expand with HSL logic

# --- Grid visualization ---
df["color"] = df["current"].apply(lambda a: alliances.get(a, "#cccccc"))

fig = px.scatter(
    df, x="col", y="row",
    color="color",
    hover_data=["id", "type", "level", "current", "first_capture", "final_capture"],
    symbol="type"
)
fig.update_traces(marker=dict(size=12))
fig.update_yaxes(autorange="reversed")

st.plotly_chart(fig, use_container_width=True)

# --- Square editor ---
st.header("Square Editor")
square_id = st.number_input("Select square ID", 0, num_squares-1, 0)
selected = df.loc[square_id]

st.write("Editing square:", selected.to_dict())
new_type = st.selectbox("Type", ["City", "Stronghold", "Trade Post"], index=1)
new_level = st.slider("Level", 1, 10, int(selected["level"]))
new_current = st.selectbox("Current Alliance", list(alliances.keys()))

# Update demo
df.loc[square_id, ["type", "level", "current"]] = [new_type, new_level, new_current]
