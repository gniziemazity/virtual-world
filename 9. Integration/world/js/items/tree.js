class Tree {
   constructor(center, size, height = 200) {
      this.center = center;
      this.size = size; // size of the base
      this.height = height;
      this.base = this.#generateLevel(center, size);
   }

   #generateLevel(point, size) {
      const points = [];
      const rad = size / 2;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
         const kindOfRandom = Math.cos(((a + this.center.x) * size) % 17) ** 2;
         const noisyRadius = rad * lerp(0.5, 1, kindOfRandom);
         points.push(translate(point, a, noisyRadius));
      }
      return new Polygon(points);
   }

   draw(ctx, viewPoint) {
      const top = getFake3dPoint(this.center, viewPoint, this.height);

      const levelCount = 7;
      for (let level = 0; level < levelCount; level++) {
         const t = level / (levelCount - 1);
         const point = lerp2D(this.center, top, t);
         const color = "rgb(30," + lerp(50, 200, t) + ",70)";
         const size = lerp(this.size, 40, t);
         const poly = this.#generateLevel(point, size);
         poly.draw(ctx, { fill: color, stroke: "rgba(0,0,0,0)" });
      }
   }
}