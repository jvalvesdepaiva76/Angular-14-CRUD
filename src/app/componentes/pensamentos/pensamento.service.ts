import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamentos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos'
  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string): Observable<Pensamento[]> {
    const itensPorPagina = 6;

    let params = new HttpParams().set("_page", pagina).set("_limit", itensPorPagina)

    if(filtro.trim().length > 2) {
      params = params.set("q", filtro)
    }

    return this.http.get<Pensamento[]>(this.API, { params: params})

  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  listarPensamentosFavoritos(pagina: number, filtro: string): Observable<Pensamento[]> {

    const itensPorPagina = 6;

    let params = new HttpParams().set("_page", pagina).set("_limit", itensPorPagina).set("favorito", true)

    if(filtro.trim().length > 2) {
      params = params.set("q", filtro)
    }

    return this.http.get<Pensamento[]>(this.API, { params: params})


  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito
    return this.editar(pensamento)
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }

}
