import pandas as pd
from geopy.distance import geodesic

def format_coord(lat:str, lon:str) -> tuple:
    lat = lat.replace(",", ".")
    lon =lon.replace(",", ".")
    lat = float(lat)
    lon = float(lon)
    return lon, lat

def calculate_distances(group):
    group = group.reset_index()
    previous_shifted = group['COORD'].shift(1)
    next_shifted = group['COORD'].shift(-1)
    group['distance_to_prev'] = [geodesic(c1, c2).m if not pd.isna(c2) else 0 for c1, c2 in zip(group['COORD'], previous_shifted)]
    group['distance_to_next'] = [geodesic(c1, c2).m if not pd.isna(c2) else 0 for c1, c2 in zip(group['COORD'], next_shifted)]
    group = group.drop(columns='index')
    return group


def format_shape(shape: dict) -> dict:
    df = pd.DataFrame(shape)
    df['COORD'] = df.apply(lambda row: format_coord(row['LAT'], row['LON']), axis=1)
    df = df.drop(['LAT', 'LON'], axis=1)
    df = df.groupby(['SHP', 'COD'], group_keys=False).apply(calculate_distances)
    mean_distance_prev = df['distance_to_prev'].mean()
    std_distance_prev = df['distance_to_prev'].std()
    mean_distance_next = df['distance_to_next'].mean()
    std_distance_next = df['distance_to_next'].std()
    threshold_prev = mean_distance_prev + 3 * std_distance_prev
    threshold_next = mean_distance_next + 3 * std_distance_next
    df_filtered = df[(df['distance_to_prev'] <= threshold_prev) & (df['distance_to_next'] <= threshold_next)]
    df_filtered = df_filtered.drop(['distance_to_prev', 'distance_to_next'], axis=1)
    return df_filtered.to_dict(orient='records')