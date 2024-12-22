import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spin-wheel',
  templateUrl: './spin-wheel.component.html',
  styleUrls: ['./spin-wheel.component.css'],
})
export class SpinWheelComponent {
  @ViewChild('wheel') wheel!: ElementRef<HTMLDivElement>;

  isSpinning = false;
  spinResult: string | null = null;
  totalSegments = 8; // Total number of segments
  segmentAngle = 360 / this.totalSegments;

  // Define the segments with their labels, colors, and winning percentages
  segments = [
    { label: '100', color: '#db7093', percentage: 1 },
    { label: '1$', color: '#20b2aa', percentage: 1 },
    { label: '30$', color: '#daa520', percentage: 1 },
    { label: '40$', color: '#daa520', percentage: 1 },
    { label: '60$', color: '#daa520', percentage: 1 },
    { label: '70$', color: '#daa520', percentage: 1 },
    { label: '80$', color: '#daa520', percentage: 44 },
    { label: '20$', color: '#ff7f50', percentage: 50 }
  ];

  spinWheel(): void {
    if (this.isSpinning) {
      return;
    }
  
    this.isSpinning = true;
    this.spinResult = null;
  
    // Calculate cumulative percentages for segments
    const cumulativePercentages: number[] = [];
    this.segments.reduce((acc, segment) => {
      cumulativePercentages.push(acc + segment.percentage);
      return acc + segment.percentage;
    }, 0);
  
    // Randomly determine the winning segment based on percentages
    const random = Math.random() * 100;
    const winningSegmentIndex = cumulativePercentages.findIndex(
      (cumPercentage) => random <= cumPercentage
    );
  
    // Calculate a random stopping point within the winning segment
    const segmentStartAngle = winningSegmentIndex * this.segmentAngle;
    const segmentEndAngle = segmentStartAngle + this.segmentAngle;
    const randomOffsetWithinSegment = Math.random() * this.segmentAngle;
    const winningAngle = segmentStartAngle + randomOffsetWithinSegment;
  
    // Total spin amount (random full rotations + winning angle)
    const totalSpins = Math.floor(Math.random() * 5 + 5); // 5-10 full spins
    const totalSpinDegrees = totalSpins * 360 + (360 - winningAngle);
  
    // Use a single CSS transition for continuous spin with speed deceleration
    const totalDuration = 5; // Total duration of the spin in seconds
    this.wheel.nativeElement.style.transition = `transform ${totalDuration}s cubic-bezier(0.25, 1, 0.5, 1)`;
    this.wheel.nativeElement.style.transform = `rotate(${totalSpinDegrees}deg)`;
  
    // Set the final result after the total spin duration
    setTimeout(() => {
      this.wheel.nativeElement.style.transition = 'none';
      const endRotation = totalSpinDegrees % 360;
      this.wheel.nativeElement.style.transform = `rotate(${endRotation}deg)`;
  
      // Determine the final segment based on the stopping angle
      const adjustedRotation = (360 - endRotation + this.segmentAngle / 2) % 360;
      const finalSegmentIndex = Math.floor(adjustedRotation / this.segmentAngle) % this.totalSegments;
  
      // Set the result
      this.spinResult = this.segments[finalSegmentIndex].label;
      this.isSpinning = false;
    }, totalDuration * 1000);
  }
  
  
  
  
  
  

}
