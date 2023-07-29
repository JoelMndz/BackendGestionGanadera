export interface IAlmacenamientoStrategy{
  
  subirImagenEnBase64(base64: string): Promise<string>;

}