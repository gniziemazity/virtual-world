const Osm = {
   parseRoads: (data) => {
      const nodes = data.elements.filter((n) => n.type == "node");
      
      const lats = nodes.map(n => n.lat);
      const lons = nodes.map(n => n.lon);

      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLon = Math.min(...lons);
      const maxLon = Math.max(...lons);

      const deltaLat = maxLat - minLat;
      const deltaLon = maxLon - minLon;
      const ar = deltaLon / deltaLat;
      const height = deltaLat * 111000 * 10;
      const width = height * ar * Math.cos(degToRad(maxLat));

      const points = [];
      const segments = [];
      for (const node of nodes) {
         const y = invLerp(maxLat, minLat, node.lat) * height;
         const x = invLerp(minLon, maxLon, node.lon) * width;
         const point = new Point(x, y);
         point.id = node.id;
         points.push(point);
      }

      const ways = data.elements.filter(w => w.type == "way");
      for (const way of ways) {
         const ids = way.nodes;
         for (let i = 1; i < ids.length; i++) {
            const prev = points.find((p) => p.id == ids[i - 1]);
            const cur = points.find((p) => p.id == ids[i]);
            const oneWay = way.tags.oneway || way.tags.lanes == 1;
            segments.push(new Segment(prev, cur, oneWay));
         }
      } 

      return { points, segments };
   }
}