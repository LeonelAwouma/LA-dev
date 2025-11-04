export type SoundEvent = 'move' | 'capture' | 'check' | 'victory' | 'new-game';

const soundFiles: Record<SoundEvent, string> = {
  move: 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3',
  capture: 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3',
  check: 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-check.mp3',
  victory: 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/game-end.mp3',
  'new-game': 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/game-start.mp3',
};


class SoundManager {
  private audioContext: AudioContext | null = null;
  private audioBuffers: Map<SoundEvent, AudioBuffer> = new Map();
  private isMuted: boolean = true;
  private volume: number = 0.5;
  private isUnlocked: boolean = false;
  private isLoading: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
        document.addEventListener('click', this.unlockAudio, { once: true });
        document.addEventListener('touchstart', this.unlockAudio, { once: true });
        this.loadVolumeSettings();
    }
  }

  private unlockAudio = () => {
    if (this.isUnlocked || typeof window === 'undefined') return;
    this.audioContext = new window.AudioContext();
    this.isUnlocked = true;
    this.loadSounds();
  };
  
  private async loadSounds() {
    if (!this.audioContext || this.isLoading) return;
    this.isLoading = true;

    const promises = Object.entries(soundFiles).map(async ([event, url]) => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
        this.audioBuffers.set(event as SoundEvent, audioBuffer);
      } catch (error) {
        console.error(`Failed to load sound for ${event}:`, error);
      }
    });

    await Promise.all(promises);
    this.isLoading = false;
  }

  public play = (event: SoundEvent) => {
    if (this.isMuted || !this.isUnlocked || !this.audioContext) return;
    
    const audioBuffer = this.audioBuffers.get(event);
    if (!audioBuffer) {
        if (!this.isLoading) {
            this.loadSounds();
        }
      return;
    }
    
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = this.volume;
    
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    source.start(0);
  };
  
  private loadVolumeSettings() {
    const savedVolume = localStorage.getItem('chess-sound-volume');
    const savedMute = localStorage.getItem('chess-sound-muted');
    if (savedVolume) this.volume = parseFloat(savedVolume);
    if (savedMute) this.isMuted = JSON.parse(savedMute);
  }

  private saveVolumeSettings() {
    localStorage.setItem('chess-sound-volume', this.volume.toString());
    localStorage.setItem('chess-sound-muted', JSON.stringify(this.isMuted));
  }

  public setVolume = (newVolume: number) => {
    this.volume = Math.max(0, Math.min(1, newVolume));
    if (this.volume > 0 && this.isMuted) {
      this.isMuted = false;
    }
    this.saveVolumeSettings();
  };

  public getVolume = () => this.volume;

  public toggleMute = () => {
    this.isMuted = !this.isMuted;
    this.saveVolumeSettings();
    return this.isMuted;
  };
  
  public getIsMuted = () => this.isMuted;
}

// Singleton instance
export const soundManager = new SoundManager();
