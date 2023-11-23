class Crossing extends Marking {
   constructor(center, directionVector, width, height) {
      super(center, directionVector, width, height);

      this.borders = [this.poly.segments[0], this.poly.segments[2]];
      this.type = "crossing";
   }

   draw(ctx) {
      const perp = perpendicular(this.directionVector);
      const line = new Segment(
         add(this.center, scale(perp, this.width / 2)),
         add(this.center, scale(perp, -this.width / 2))
      );
      line.draw(ctx, {
         width: this.height,
         color: "white",
         dash: [11, 11]
      });
   }
}