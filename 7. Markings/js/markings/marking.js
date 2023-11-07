class Marking  {
   constructor(center, directionVector, width, height) {
      this.center = center;
      this.directionVector = directionVector;
      this.width = width;
      this.height = height;

      this.support = new Segment(
         translate(center, angle(directionVector), height / 2),
         translate(center, angle(directionVector), -height / 2)
      );
      this.poly = new Envelope(this.support, width, 0).poly;
   }

   draw(ctx) {
      this.poly.draw(ctx);
   }
}