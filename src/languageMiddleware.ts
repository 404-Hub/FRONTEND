import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';
import { languages, fallbackLng } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const handleLanguage = (
  request: NextRequest,
  cookieName: string,
  searchParamName: string,
): NextResponse | undefined => {
  let lngInSearchParams: string | null = null;
  let lngInCookie: string | null = null;

  if (request.nextUrl.searchParams.has(searchParamName)) {
    const paramValue = request.nextUrl.searchParams.get(searchParamName) || '';
    lngInSearchParams = acceptLanguage.get(paramValue);
    // console.log('MW lngInSearchParams=>', lngInSearchParams);
  }

  const cookie = request.cookies.get(cookieName);
  if (cookie) {
    lngInCookie = acceptLanguage.get(cookie.value);
    // console.log('MW cookie=>', cookie);
    // console.log('MW lngInCookie=>', lngInCookie);
  }

  const lngInAcceptHeader: string | null = acceptLanguage.get(request.headers.get('Accept-Language') || '');
  // console.log('MW lngInAcceptHeader=>', lngInAcceptHeader);

  const lng: string = lngInSearchParams || lngInCookie || lngInAcceptHeader || fallbackLng;
  // console.log('MW lng=>', lng);

  const response: NextResponse = NextResponse.next();
  if (lngInCookie !== lng) {
    // console.log('MW setting cookie');
    response.cookies.set(cookieName, lng);
  }
  // console.log('MW response=>', response);
  return response;
};
