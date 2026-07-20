{{- define "api.name" -}}
{{- .Chart.Name -}}
{{- end -}}

{{- define "api.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}