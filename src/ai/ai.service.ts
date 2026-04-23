import { Injectable } from '@nestjs/common';
// import OpenAI from 'openai';

@Injectable()
export class AiService {
  // private openai: OpenAI;

  constructor() {
    /*
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    */
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async generateSummary(leads: any[]): Promise<any> {
    if (!leads.length) {
      return 'No hay leads para analizar en el rango seleccionado.';
    }

    // LLamada a buildPrompt para generar el prompt dinámicamente basado en los leads
    //const prompt = this.buildPrompt(leads);

    // Llamada a callOpenAI para obtener el resumen generado por la IA
    // return this.callOpenAI(prompt);

    return this.mockResponse(leads);
  }

  private buildPrompt(leads: any[]): string {
    return ` Eres un analista de marketing. Analiza los siguientes leads y genera un resumen ejecutivo claro y profesional.
    Leads:${JSON.stringify(leads, null, 2)}

    Incluye:
    - Análisis general
    - Fuente principal
    - Recomendaciones accionables
    `;
  }

  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  private async callOpenAI(prompt: string): Promise<string> {
    /*
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content || '';
    */

    return '';
  }

  private mockResponse(leads: any[]): any {
    const total = leads.length;

    const fuentes: Record<string, number> = {};
    let totalPresupuesto = 0;

    leads.forEach((lead) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      fuentes[lead.fuente] = (fuentes[lead.fuente] || 0) + 1;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (lead.presupuesto) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        totalPresupuesto += Number(lead.presupuesto);
      }
    });

    const fuentePrincipal = Object.entries(fuentes).sort(
      (a, b) => b[1] - a[1],
    )[0][0];

    const promedio = totalPresupuesto / total || 0;

    return {
      totalLeads: total,
      fuentePrincipal,
      promedioPresupuesto: Number(promedio.toFixed(2)),
      analisis: `La mayor cantidad de leads proviene de ${fuentePrincipal}, indicando un canal dominante.`,
      recomendaciones: [
        `Aumentar inversión en ${fuentePrincipal}`,
        'Optimizar canales secundarios',
        'Segmentar leads por presupuesto',
      ],
    };
  }
}
