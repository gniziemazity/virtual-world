function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
   let minDist = Number.MAX_SAFE_INTEGER;
   let nearest = null;
   for (const point of points) {
      const dist = distance(point, loc);
      if (dist < minDist && dist < threshold) {
         minDist = dist;
         nearest = point;
      }
   }
   return nearest;
}

function distance(p1, p2) {
   return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function add(p1, p2) {
   return new Point(p1.x + p2.x, p1.y + p2.y);
}

function subtract(p1, p2) {
   return new Point(p1.x - p2.x, p1.y - p2.y);
}

function scale(p, scaler) {
   return new Point(p.x * scaler, p.y * scaler);
}